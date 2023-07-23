export const getDiscountedPercentage = (original_price, price) => {
    return Math.floor(((original_price - price) / original_price) * 100);
}