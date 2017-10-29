const ProductService = require('../services/Product');

exports.obtainProduct = async function(id, quantity){
    try{
        let searchParams = {
            categoryId: parseInt(id),
            quantity: parseFloat(quantity)
        };

        let arrayList = [];
        let maxValue = await ProductService.obtainMaxProduct(searchParams.categoryId, searchParams.quantity);
        let absoluteMax = parseInt(searchParams.quantity);
        let products = await ProductService.obtainApproximateProduct(searchParams.categoryId, searchParams.quantity);

        if(parseInt(maxValue[0][0].max) !== 0) {
            let auxArray = [];
            for (let i = searchParams.quantity; i >= maxValue[0][0].max; i--) {
                if (absoluteMax <= 0) {
                    break;
                }

                products[0].some((product) => {
                    if (absoluteMax < 0) {
                        return;
                    }

                    if (absoluteMax >= product.package) {
                        while(absoluteMax >= product.package) {
                            auxArray.push(product);
                            absoluteMax = absoluteMax - product.package;
                        }
                        return;
                    }
                });
            }

            arrayList = auxArray;

        } else {
            products[0][0].package = searchParams.quantity;
            arrayList.push(products[0][0]);
        }

        return {status:200, data:arrayList}
    }
    catch(err){
        return{status:500, data:"Server functionality error"}
    }
};

exports.obtainOptionalProducts = async function(arrayId, categoryId){
    try {
        let products = await ProductService.getOtherProducts(arrayId, categoryId);

        return{status:200, data:products}
    }
    catch (err){
        return{status:500, data:"Server functionality error"}
    }
};