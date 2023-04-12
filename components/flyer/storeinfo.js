import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

function StoreInfo(props) {
  return (
    <div>
      <div className="card mt-5" key={props.id}>
        <Link href={`/store/${props.id}`}>
          <div className='p-2'>
          <Image
            src={props.banner}
            alt={props.name}
            className="rounded shadow-md"
            width={350}
            height={70}
          />
          </div>
          <div>
           
            <h2 className="text-xs font-bold p-2 text-center">{props.name}</h2>
            <div className="text-xs text-center">
              City: {props.city}
            </div>
          </div>
          <div className='text-center text-sm'>
            <h3>{props.address}</h3>
            <h2>{props.state}</h2>
            <h3>{props.tel}</h3>
          </div>
         
        </Link>
      </div>
    </div>
  );
}

export default StoreInfo;
