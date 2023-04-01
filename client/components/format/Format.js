export function DateFormat(date) {
  const dateold= date.split(" ")
  const newsdate = dateold[0]

  const dateformate = newsdate.split("-")

  const yaer = dateformate[0]
  const month = dateformate[1]
  const day = dateformate[2]

  return `${day}/${month}/${yaer}`
}

export function Precentage(x) {
  const value = Number.parseFloat(x*100).toFixed(1);
  return (value > 0) ? "+" + value +'%': value +'%';
}

export function NosymbolPrecentage(x) {
  if (x <=0 || x === null){
    return null
  }
  else if(x>1){
    return Number.parseFloat(x).toFixed(1) + '%';
  }
  else{
    return Number.parseFloat(x*100).toFixed(1) +'%';
  }
}

export function NosymbolNoNullPrecentage(x){
  if(x>1){
    return Number.parseFloat(x).toFixed(1) + '%';
  }
  else{
    return Number.parseFloat(x*100).toFixed(1) +'%';
  }

}

export function RatioFor(x){
  if (x===""){
    return ""
  }
  return Number.parseFloat(x).toFixed(1);
}


export function PrecentageChange(x) {
  const num = (x -1) *100
  const newnum = Number.parseFloat(num).toFixed(1);
  return (newnum > 0) ? "+" + newnum + "%": newnum + "%";
}

export function PricePrecentage(x) {
  const num = x *100
  const newnum = Number.parseFloat(num).toFixed(1);
  return  (newnum > 0) ? "+" + newnum + "%": newnum + "%";
}

export function Financial(x) {
  const value = Number.parseFloat(x).toFixed(2);
  return (value > 0) ? "+" + value : value;
}

export function Zeroformate(num) {
  if (num=== 0){
    return "N.A"
  }
  return num
}

export function Dollarformate(x) {
  if(x>1000000000){
    const num = Number.parseFloat(x/1000000000).toFixed(2);
    return num + 'B'
  }
}

export function dataFormat(num) {      
  if (num === null){
    return 'N.A.'
  }

  if (num >= 100000000){
    return "$" + (num/1000000000).toFixed(1)+'B';
  }
  if(num >=1000000){
    return "$" + (num/1000000).toFixed(1)+'M';
  }
  if(num >=1000){
    return "$" + (num/1000).toFixed(1)+'K';
  }
  if(num >0){
    return "$" + num.toFixed(1);
  }
  if(num<=-100000000){
    return "$" + (num/1000000000).toFixed(1)+'B';
  }
  if(num<=-1000000){
    return "$" + (num/1000000).toFixed(1)+'B';
  }
  if(num<=-1000){
    return "$" + (num/1000).toFixed(1)+'K';
  }
  if(num <0){
    return "$" + num.toFixed(1);
  }

}







