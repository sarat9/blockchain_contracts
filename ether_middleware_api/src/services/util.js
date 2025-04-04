

async function calculateCostofTransaction(tx){
const receipt = await tx.wait();
console.log("Gas used:", receipt.gasUsed.toString());
console.log("Effective gas price:", receipt.effectiveGasPrice.toString());

const cost = receipt.gasUsed * receipt.effectiveGasPrice;
console.log("Total cost in wei:", cost.toString());
console.log("In ETH:", ethers.formatEther(cost));
}