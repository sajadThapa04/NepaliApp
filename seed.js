const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Load service account
const serviceAccount = require("./serviceAccountKey.json");

console.log("📋 Project ID:", serviceAccount.project_id);
console.log("📍 Firestore Region: us-central (automatic)");

// Initialize Firebase Admin
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id
  });
  console.log("✅ Firebase initialized successfully");
}

// NO CUSTOM SETTINGS - let it auto-detect
const db = admin.firestore();

// Test connection
async function testConnection() {
  console.log("\n🔍 Testing connection to Firestore...");
  
  try {
    // Simple test - just try to write and read
    const testRef = db.collection('_test').doc('connection-test');
    await testRef.set({
      timestamp: Date.now(),
      message: "Testing connection"
    });
    
    const doc = await testRef.get();
    if (doc.exists) {
      await testRef.delete();
      console.log("✅ Firestore connection successful! ✓");
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Connection failed: ${error.code} - ${error.message}`);
    return false;
  }
}

// Helper function for Nepali alphabet
function getAlphabet(firstChar) {
  const nepaliChars = {
    'अ': 'अ', 'आ': 'आ', 'इ': 'इ', 'ई': 'ई', 'उ': 'उ', 'ऊ': 'ऊ',
    'ए': 'ए', 'ऐ': 'ऐ', 'ओ': 'ओ', 'औ': 'औ',
    'क': 'क', 'ख': 'ख', 'ग': 'ग', 'घ': 'घ', 'ङ': 'ङ',
    'च': 'च', 'छ': 'छ', 'ज': 'ज', 'झ': 'झ', 'ञ': 'ञ',
    'ट': 'ट', 'ठ': 'ठ', 'ड': 'ड', 'ढ': 'ढ', 'ण': 'ण',
    'त': 'त', 'थ': 'थ', 'द': 'द', 'ध': 'ध', 'न': 'न',
    'प': 'प', 'फ': 'फ', 'ब': 'ब', 'भ': 'भ', 'म': 'म',
    'य': 'य', 'र': 'र', 'ल': 'ल', 'व': 'व', 'श': 'श',
    'ष': 'ष', 'स': 'स', 'ह': 'ह'
  };
  
  if (firstChar === 'क्ष') return 'क्ष';
  if (firstChar === 'त्र') return 'त्र';
  if (firstChar === 'ज्ञ') return 'ज्ञ';
  
  // Fix: Changed 'م', 'ر', 'ل', 'و', 'ش', 'س', 'ه' to proper Nepali characters
  return nepaliChars[firstChar] || 'अ';
}

async function uploadData() {
  try {
    // Test connection first
    const isConnected = await testConnection();
    if (!isConnected) {
      console.log("\n❌ Cannot connect to Firestore.");
      console.log("\n💡 Please check:");
      console.log("   1. Firestore database is created in Firebase Console");
      console.log("   2. Security rules are set to test mode");
      console.log("   3. Service account has proper permissions");
      process.exit(1);
    }

    // Read your JSON file
    const jsonPath = path.join(__dirname, "ukhans_database.json");
    
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Could not find your source JSON file at: ${jsonPath}`);
    }

    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const proverbsList = JSON.parse(rawData);
    
    if (!proverbsList.length) {
      throw new Error("No proverbs found in JSON file.");
    }

    console.log(`\n🚀 Found ${proverbsList.length} items. Uploading to Firebase...\n`);

    const ukhansCollection = db.collection("ukhans");
    
    let batch = db.batch();
    let count = 0;
    let batchCount = 0;
    let batchNumber = 0;
    const BATCH_SIZE = 500;

    for (const item of proverbsList) {
      if (!item.text) {
        console.warn(`⚠️ Skipping item: No text field`);
        continue;
      }

      const cleanText = item.text.normalize("NFC").trim();
      const firstChar = cleanText.charAt(0);
      const alphabet = getAlphabet(firstChar);

      const docData = {
        alphabet: alphabet,
        text: cleanText,
        meaning: item.meaning || "",
        views: 0,
        likes: 0,
        isVerified: true,
        createdBy: "system",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = ukhansCollection.doc();
      batch.set(docRef, docData);
      
      count++;
      batchCount++;

      if (batchCount >= BATCH_SIZE) {
        batchNumber++;
        console.log(`📦 Committing batch ${batchNumber} (${count} documents)...`);
        await batch.commit();
        console.log(`✅ Batch ${batchNumber} completed\n`);
        batch = db.batch();
        batchCount = 0;
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    if (batchCount > 0) {
      batchNumber++;
      console.log(`📦 Committing final batch ${batchNumber}...`);
      await batch.commit();
      console.log(`✅ Final batch completed\n`);
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`✅ SUCCESS! ${count} proverbs migrated to Firebase Firestore!`);
    console.log(`   Project: ${serviceAccount.project_id}`);
    console.log(`   Region: us-central1`);
    console.log(`   Collection: ukhans`);
    console.log(`${'='.repeat(50)}`);
    
    // Verify the data
    console.log("\n🔍 Verifying data...");
    const testQuery = await db.collection("ukhans").limit(3).get();
    console.log("✅ First 3 documents in Firestore:");
    testQuery.forEach(doc => {
      const data = doc.data();
      console.log(`\n  📄 ID: ${doc.id}`);
      console.log(`     Alphabet: ${data.alphabet}`);
      console.log(`     Text: ${data.text.substring(0, 60)}...`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed:", error.message);
    if (error.code) console.error("Error code:", error.code);
    process.exit(1);
  }
}

// Start the upload
uploadData();