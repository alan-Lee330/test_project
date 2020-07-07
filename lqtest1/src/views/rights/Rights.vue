<template>
    <div>
        <breadcrumb :itemsMenu="['首页','权限管理','权限列表']"></breadcrumb>
    </div>
</template>

<script>
    import Breadcrumb from "@components/Breadcrumb";

    export default {
        name: "Rights",
        components:{
            Breadcrumb
        }
    }
</script>

<style scoped>

</style>