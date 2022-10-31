import  { Component, Plugin } from "vue";
import MainLayout  from "@/layouts/MainLayout.vue"
 const components:Map<string,Component> = new Map([
['main',MainLayout]
 ])

export const globalComponentsPluggin:Plugin = (app,...args)=>{
for (let [key,value] of components.entries()){
app.component(key,value)
}

}