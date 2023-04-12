import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


function HomePage() {
 
 
  return (
    <div>
     <Image src='/images/mainbanner.jpg' width={700} height={260} alt='banner' className='mb-5'/>
     <Image src='/images/subbanner.jpg' width={700} height={260} alt='banner' className='mb-5' />
     <Image src='/images/subbanner2.jpg' width={700} height={260} alt='banner' className='mb-5' />
     <Image src='/images/subbanner3.jpg' width={700} height={260} alt='banner' className='mb-5' />
     <Image src='/images/subbanner4.jpg' width={700} height={260} alt='banner' className='mb-5' />  
     
    </div>
  );
}

export default HomePage;
