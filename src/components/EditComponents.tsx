import { Edit, ImageInput, NumberInput, ReferenceInput, SimpleForm, TextInput } from 'react-admin';

export const BrandEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="desc" />
        </SimpleForm>
    </Edit>
);

export const CategoryEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="desc" />
        </SimpleForm>
    </Edit>
);

export const ItemEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="desc" />
            <TextInput source="price" />
            <NumberInput source="amount" />
            <ReferenceInput source="brand" reference='brands'/>
            <ReferenceInput source='category' reference='categories'/>
        </SimpleForm>
    </Edit>
);

export const ImageEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source='item' reference='items'/>
            <ImageInput source="image_file" />
        </SimpleForm>
    </Edit>
);
