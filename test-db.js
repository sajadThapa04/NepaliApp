// check-db.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: serviceAccount.project_id
});

const db = admin.firestore();

async function checkDatabase() {
  try {
    console.log("🔍 Checking Firestore connection...");
    console.log(`📁 Project ID: ${serviceAccount.project_id}`);
    
    // Try to write a test document
    const testRef = db.collection('_test_connection').doc('test');
    
    await testRef.set({
      timestamp: new Date().toISOString(),
      message: "Testing connection"
    });
    
    console.log("✅ Success! Connected to Firestore!");
    
    // Read it back
    const doc = await testRef.get();
    console.log("✅ Read test document successfully!");
    
    // Clean up
    await testRef.delete();
    console.log("✅ Test document cleaned up");
    
    console.log("\n🎉 Your Firestore is working correctly!");
    console.log("Try running your seed.js again.");
    
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    
    if (error.code === 5 || error.message.includes("NOT_FOUND")) {
      console.log("\n⚠️ Database not found error!");
      console.log("\n📋 Solutions:");
      console.log("1. Go to Firebase Console → Firestore Database");
      console.log("2. Check if you have created a database");
      console.log("3. If no database exists, click 'Create database'");
      console.log("4. Note the database name (usually '(default)')");
      console.log("\n💡 Most likely you need to create the Firestore database first!");
    }
    
    console.log("\n📝 Error code:", error.code);
  }
  
  process.exit(0);
}

checkDatabase();