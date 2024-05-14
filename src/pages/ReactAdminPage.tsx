import { Admin, Resource, ListGuesser } from "react-admin";
import dataProvider from "../api/dataProvider";
import { ItemList } from "../components/ItemList";
import { ImageList } from "../components/ImageList";
import { ItemEdit, CategoryEdit, BrandEdit, ImageEdit } from "../components/EditComponents";
import { BrandCreate, CategoryCreate, ImageCreate, ItemCreate } from "../components/CreateComponents";

export const ReactAdminPage = () => (
    <Admin dataProvider={dataProvider} basename="/reactadmin">
        <Resource name='items' list={ItemList} edit={ItemEdit} create={ItemCreate}/>
        <Resource name='categories' list={ListGuesser} edit={CategoryEdit} create={CategoryCreate} recordRepresentation="name"/>
        <Resource name='brands' list={ListGuesser} edit={BrandEdit} create={BrandCreate} recordRepresentation="name"/>
        <Resource name='images' list={ImageList} edit={ImageEdit} create={ImageCreate}/>
    </Admin>
);
