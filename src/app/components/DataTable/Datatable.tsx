'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Datatable(props:any) {
    const {header, data, imginerayLineIndex, peMaxVolumeValue, ceMaxVolumeValue, ceMaxOiValue, peMaxOiValue} = props || {};

    console.log(ceMaxVolumeValue, peMaxVolumeValue);
    const cellStyle = (header : string, headerValue: number) => {
      if(header == 'totalTradedVolume' && headerValue == (ceMaxVolumeValue || peMaxVolumeValue))
        return 'bg-[#38bdf8]';

      if (header == 'openInterest' && headerValue == (ceMaxOiValue ))
        return 'bg-[#fecdd3]';

      if (header == 'openInterest' && headerValue == (peMaxOiValue))
        return 'bg-[#a7f3d0]';

      return '';
    }
    const conatinerWrapperStyle = {
      display: 'inline-flex',
      width: '50%',
      flexDirection: 'column', 
    }
      return (
        <>
      <Table>
      <TableHeader>
        <TableRow>
        {Object.keys(header).map( (headerValue: string, i: number) => (
          <TableHead key={`header_${i}`}>{header[headerValue]}</TableHead>
        ))}
        </TableRow>
      </TableHeader>
      <TableBody>
      {data.map( (data:any, index: number) =>  ( 
            <>
            <TableRow key={`dataRow_${index}`}>
            {Object.keys(header).map( (headerValue:string, i:number) => (
            <>
            
            <TableCell 
              key={`data_${i}`}               
              className={`py-1 px-2 ${headerValue == 'strikePrice' ? 'sp_Col':''} ${cellStyle(headerValue, data[headerValue])}`}
              >
              {parseFloat(data[headerValue]).toFixed(2)}
              {headerValue === 'totalTradedVolume' && <>
              <br/>
              {`${(data[headerValue]/(ceMaxVolumeValue || peMaxVolumeValue)*100).toFixed(2)}%`}
              </>}
              {headerValue === 'openInterest' && <>
              <br/>
              {`${(data[headerValue]/(ceMaxOiValue || peMaxOiValue)*100).toFixed(2)}%`}
              </>}
            </TableCell>
            </>
            )
            )}
            </TableRow>
            {index === imginerayLineIndex && 
            <TableRow className="bg-[#dc2626] hover:bg-[#dc2626]"><TableCell colSpan={7} className="p-0 pt-1 bg-red-600"></TableCell></TableRow>}
            </>
          ))}
      </TableBody>
    </Table>
    </>
    )
  }