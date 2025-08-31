
export function Rating({ rate }: { rate: number }) {
  const fullStars = Math.floor(rate);// 4.3-4
  const halfStar = rate - fullStars >= 0.5;//4.3-4=0.3 should be>5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);//5-4 ete halfstar true -1

  return (
    <div className=" text-amber-300">
      {Array(fullStars).fill(0).map((_, i) => (//[0,0,0,0] 0 bac toxni dni i
        <span key={"full" + i}>★</span>
      ))}

      {halfStar && <span key="half">☆</span> }

      {Array(emptyStars).fill(0).map((_, i) => (
        <span key={"empty" + i}>☆</span>
      ))}
    </div>
  );
}
