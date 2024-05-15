import { Admin, Resource } from "react-admin";
import dataProvider from "../api/dataProvider";
import { ItemEdit, CategoryEdit, BrandEdit, ImageEdit } from "../components/EditComponents";
import { BrandCreate, CategoryCreate, ImageCreate, ItemCreate } from "../components/CreateComponents";
import { BrandList, CategoryList, ImageList, ItemList } from "../components/ListComponents";
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

export const ReactAdminPage = () => (
    <Admin dataProvider={dataProvider} i18nProvider={i18nProvider} basename="/reactadmin">
        <Resource name='items' list={ItemList} edit={ItemEdit} create={ItemCreate} recordRepresentation="name"/>
        <Resource name='categories' list={CategoryList} edit={CategoryEdit} create={CategoryCreate} recordRepresentation="name"/>
        <Resource name='brands' list={BrandList} edit={BrandEdit} create={BrandCreate} recordRepresentation="name"/>
        <Resource name='images' list={ImageList} edit={ImageEdit} create={ImageCreate}/>
    </Admin>
);
