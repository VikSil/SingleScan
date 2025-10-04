export const getSellItBackCartID = () =>{
    const lowerBound = 335688853201145756;
    const upperBound = 935688853201145756;
    return Math.random() * (upperBound - lowerBound) + lowerBound;
}