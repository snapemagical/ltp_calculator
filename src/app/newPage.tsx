import { useEffect } from "react";

export default function Profile(props:any) {
useEffect(()=> {
    fetch("https://ltp-calculator-ntyc4k8v7-snapemagicals-projects.vercel.app/api")
    .then(response => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
    .then(data => console.log(data))
})
return (
   <h2>New Page</h2>
  );
}