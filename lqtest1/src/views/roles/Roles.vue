<template>
<div>
    <breadcrumb :itemsMenu="['首页','权限管理','角色列表']"></breadcrumb>
</div>
</template>

<script>
    import Breadcrumb from "@components/Breadcrumb";

    export default {
        name: "Roles",
        components:{
            Breadcrumb
        }
    }
</script>

<style scoped>

</style>