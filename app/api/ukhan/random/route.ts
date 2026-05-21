import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Ukhan } from '@/app/types/ukhan.types';

export async function GET() {
  try {
    // Get all ukhans from Firestore
    const ukhansRef = collection(db, 'ukhans');
    const snapshot = await getDocs(ukhansRef);
    
    const ukhans: Ukhan[] = [];
    snapshot.forEach((doc) => {
      ukhans.push({
        id: doc.id,
        ...doc.data() as Omit<Ukhan, 'id'>
      });
    });
    
    // Select random ukhan
    if (ukhans.length === 0) {
      return NextResponse.json(
        { error: 'No ukhans found' },
        { status: 404 }
      );
    }
    
    const randomIndex = Math.floor(Math.random() * ukhans.length);
    const randomUkhan = ukhans[randomIndex];
    
    return NextResponse.json(randomUkhan);
  } catch (error) {
    console.error('Error fetching random ukhan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch random ukhan' },
      { status: 500 }
    );
  }
}