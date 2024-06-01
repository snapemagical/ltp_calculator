'use client'
import { useEffect } from "react";
import Datatable from "./components/DataTable/Datatable";
import { Button } from "@/components/ui/button"

import { useRouter } from 'next/navigation'

export default function Profile(props:any) {
  const STRIKE_PRICE_DIFFERENCE = 500;

  const router = useRouter();
    const {records, filtered} = props.post;
    const { underlyingValue } = records;
    let imagenaryIndex;
    const {data} = filtered;    
    const callData = data.reduce((acc:any, data:any)=> {
      if(data.CE.strikePrice < underlyingValue && data.CE.strikePrice > underlyingValue - STRIKE_PRICE_DIFFERENCE) {
        acc.push(data.CE);
      }
      if(data.CE.strikePrice > underlyingValue && data.CE.strikePrice < underlyingValue + STRIKE_PRICE_DIFFERENCE) {
        acc.push(data.CE);
      }
      return acc;
    }, []);
    
    // const putData = data.map((data:any)=> data.PE);
    const putData = data.reduce((acc:any, data:any)=> {
      if(data.PE.strikePrice < underlyingValue && data.PE.strikePrice > underlyingValue - STRIKE_PRICE_DIFFERENCE) {
        acc.push(data.PE);
      }
      if(data.PE.strikePrice > underlyingValue && data.PE.strikePrice < underlyingValue + STRIKE_PRICE_DIFFERENCE) {
        acc.push(data.PE);
      }
      return acc;
    }, []);;

    const largestElement = (array: any) => {
        let firstMax = 0;
        let secondMax = 0
      // let largestNum = array.reduce((largest : number , current : number) =>
      //   (current > largest ? current : largest), array[0]);

      array.reduce((largest : number , current : number) => {
        // debugger;
        if(current > largest) {
            secondMax = firstMax;
            firstMax = current;
            }
            else if(current > secondMax && current !== firstMax) {    
            secondMax = current;
        };
        return current > largest ? current : largest;
    
    }, array[0]);

            return [firstMax, secondMax]
    }
    // const largestElement = (array: any) => {   
    //         return  array.reduce((largest : number , current : number) =>
    //             (current > largest ? current : largest), array[0]);
    // }
    let ceVolumeData = callData.map( (data: any) => {
      return data?.totalTradedVolume;
    });

    let peVolumeData = putData.map( (data: any) => {
      return data?.totalTradedVolume;
    });
    
    let ceOiVolumeData = callData.map( (data: any) => {
      return data?.openInterest;
    });
    let peOiVolumeData = putData.map( (data: any) => {
      return data?.openInterest;
    });
    
    const ceMaxVolumeValue = largestElement(ceVolumeData);
    const peMaxVolumeValue = largestElement(peVolumeData);
    
    const ceMaxOiValue = largestElement(ceOiVolumeData);
    const peMaxOiValue = largestElement(peOiVolumeData);


    function closestValue(array:[], value:number) {
      var result,
          lastDelta: number;
  
      array.some(function (item, index) {
          var delta = Math.abs(value - item);
          if (delta >= lastDelta) {
              return true;
          }
          result = index;
          lastDelta = delta;
      });
      return result;
  }
    let strikePrice = callData.map( (data: any) => {
      return data?.strikePrice;
    });

    let headers = Object.keys(data[0].CE);
    let headers1 = {
      "impliedVolatility": "IV",
      "changeinOpenInterest": "CHNG IN OI",
      "openInterest": 'OI',
      "totalTradedVolume": "VOLUME",
      "change": "CHNG",
      "lastPrice": "LTP",
      "strikePrice": "Strike Price"
    };
    let peHeaders = {
      "impliedVolatility": "IV",
      "changeinOpenInterest": "CHNG IN OI",
      "openInterest": 'OI',
      "totalTradedVolume": "VOLUME",
      "change": "CHNG",
      "lastPrice": "LTP",
    }
    
    const containerStyle = {
      display: 'flex',
      width: '100%'
    };
    
  const refresh = () => {
    console.log('called')
    router.refresh();
  }
  // useEffect(()=> {
  //   const timeout = setInterval(refresh, 3000);
  //   return () => clearInterval(timeout);
  // }, []);
      return (
        <>
        <div className="container mx-auto">
        <Button onClick={refresh}>Refresh</Button>
        <br/><br/>
        <div style={containerStyle}>
        <Datatable data={callData} imginerayLineIndex={closestValue(strikePrice, underlyingValue)} ceMaxVolumeValue={ceMaxVolumeValue[0]} ceMaxOiValue={ceMaxOiValue[0]}  header={headers1}/>
        
        <Datatable data={putData} imginerayLineIndex={closestValue(strikePrice, underlyingValue)} peMaxVolumeValue={peMaxVolumeValue[0]} peMaxOiValue={peMaxOiValue[0]} header={peHeaders}/>
        {/* <ul>
          {headers.map( (headerValue, i) => (<li key={`header_${i}`}>{headerValue}</li>))}
        </ul>
        <ul>
          {data.map( data =>  ( headers.map( (headerValue, i) => (<li key={`data_${i}`}>{data.CE[headerValue]}</li>))))}
          
        </ul> */}
      </div>
      </div>
      </>
      
    )
  }