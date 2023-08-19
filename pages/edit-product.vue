<template>
    <div class="container mt-3">
        <h1>Edit Product</h1>
        <form @submit.prevent="editProduct">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Name Product</span>
                <input type="text" v-model="product.prod_name" class="form-control" aria-label="Username"
                    aria-describedby="basic-addon1" required>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Price Product</span>
                <input type="text" v-model="product.prod_price" class="form-control" aria-label="Username"
                    aria-describedby="basic-addon1" required>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Product Desc</span>
                <input type="text" v-model="product.prod_desc" class="form-control" aria-label="Username"
                    aria-describedby="basic-addon1" required>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">ID</span>
                <input type="text" v-model="product.prod_id" class="form-control" aria-label="Username"
                    aria-describedby="basic-addon1" required>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Time</span>
                <input type="date" v-model="product.prod_date" class="form-control" aria-label="Username"
                    aria-describedby="basic-addon1" required>
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" type="submit">Edit Book</button>
            </div>
        </form>
    </div>
</template>
  
<script>
export default {
    name: "editProduct",
    data() {
        return {
            product: {
                prod_name: "",
                prod_price: "",
                prod_desc: "",
                prod_id: "",
                prod_date: ""
            }
        };
    },
    mounted() {
        this.fetchProduct();
    },
    methods: {
        fetchProduct() {
            const index = this.$route.params.index;
            console.log("index is :"+index);
            const products = JSON.parse(localStorage.getItem("products")) || [];
            const productToEdit = products[index];
            if (productToEdit) {
                this.product = { ...productToEdit };
            }
        },
        editProduct() {
            
            const index = this.$route.params.index;
            const products = JSON.parse(localStorage.getItem("products")) || [];
            products[index] = { ...this.product };
            const productvalue = {...this.product}
            const value = {
                index:index,
                updatedItem:productvalue
            }
            this.$store.dispatch("updateItem",value).then(()=>{
            this.$router.push("/list-product");
            })
            
        }
    }
};
</script>
  
<style scoped></style>