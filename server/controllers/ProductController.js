const ProductService = require('../services/Product');

exports.obtainProduct = async function(details){
    try{
        let searchParams = {
            categoryId: parseInt(details.id),
            quantity: parseFloat(details.quantity)
        };

        let arrayList = [];
        let maxValue = await ProductService.obtainMaxProduct(searchParams.categoryId, searchParams.quantity);
        let absoluteMax = parseInt(searchParams.quantity);
        let products = await ProductService.obtainApproximateProduct(searchParams.categoryId, searchParams.quantity);

        if(absoluteMax !== 0) {
            for (let i = searchParams.quantity; i >= maxValue[0][0].max; i--) {
                if (absoluteMax <= 0) {
                    break;
                }

                products[0].some((product) => {
                    if (absoluteMax < 0) {
                        return;
                    }

                    if (absoluteMax >= product.package) {
                        while(absoluteMax > product.package) {
                            arrayList.push(product);
                            absoluteMax = absoluteMax - product.package
                        }
                        return;
                    }
                });
            }
        } else {
                products[0][0].package = searchParams.quantity;
                arrayList.push(products[0][0]);
        }

        return {status:200, data:arrayList}
    }
    catch(err){
        console.log(err);
        return{status:500, data:"Server functionality error"}
    }
};