import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Ukhan } from '@/app/types/ukhan.types';

export async function GET() {
  try {
    const ukhansRef = collection(db, 'ukhans');
    const q = query(ukhansRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const ukhans: Ukhan[] = [];
    snapshot.forEach((doc) => {
      ukhans.push({
        id: doc.id,
        ...doc.data() as Omit<Ukhan, 'id'>
      });
    });
    
    return NextResponse.json(ukhans);
  } catch (error) {
    console.error('Error fetching ukhans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ukhans' },
      { status: 500 }
    );
  }
}