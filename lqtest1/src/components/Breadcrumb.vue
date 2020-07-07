<template>
<!--    公共组件，面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">{{itemsMenu[0]}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{itemsMenu[1]}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{itemsMenu[2]}}</el-breadcrumb-item>
        </el-breadcrumb>
</template>

<script>

    export default {
        name: "Breadcrumb",
        props:{
            itemsMenu:{
                required:true,
                type:Array
            }
        }
    }
</script>

<style scoped>
    .el-breadcrumb{
        margin-bottom: 20px;
    }
</style>