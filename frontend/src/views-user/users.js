import * as React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { SimpleList, List, Datagrid, EmailField, TextField, EditButton, ShowButton, Edit, SimpleForm, TextInput, Create, Show, SimpleShowLayout, SelectInput, DateInput, SelectField, FileField, DateField } from 'react-admin';

export const UserList = props => {
	const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

	return (
		<List title="All users" {...props}>
			{isSmall ? (
				<SimpleList
					// primaryText={record => record.name}
					secondaryText={record => record.username}
					tertiaryText={record => record.email}
				/>
			) : (
				<Datagrid>
					<TextField source="username" />
					<EmailField source="email" />
					<DateField source="birthday" />
					<TextField source="furigana" />
					<TextField source="phoneNumber" />
					<TextField source="locationCity" />
					<TextField source="locationProvince" />
					<TextField source="extra" />
					<SelectField source="userConfirmed"
						choices={[
							{
								id: -1,
								name: 'no ID',
							},
							{
								id: 0,
								name: 'not confirmed',
							},
							{
								id: 1,
								name: 'confirmed',
							},
						]} />
					<SelectField source="quitConfirmed"
						choices={[
							{
								id: -1,
								name: 'no ID',
							},
							{
								id: 0,
								name: 'not confirmed',
							},
							{
								id: 1,
								name: 'confirmed',
							},
						]} />
					<EditButton />
					<ShowButton />
				</Datagrid>
			)}
		</List>
	);
};

export const UserEdit = props => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput source="username" />
			<TextInput source="email" />
			<DateInput source="birthday" />
			<TextInput source="furigana" />
			<TextInput source="phoneNumber" />
			<TextInput source="locationCity" />
			<TextInput source="locationProvince" />
			<TextInput source="extra" />
			<SelectInput
				source="userConfirmed"
				choices={[
					{
						id: '-1',
						name: 'no ID',
					},
					{
						id: '0',
						name: 'not confirmed',
					},
					{
						id: '1',
						name: 'confirmed',
					},
				]}
			/>
			<SelectInput
				source="quitConfirmed"
				choices={[
					{
						id: '-1',
						name: 'no Quit',
					},
					{
						id: '0',
						name: 'not confirmed',
					},
					{
						id: '1',
						name: 'confirmed',
					},
				]}
			/>
		</SimpleForm>
	</Edit>
);

export const UserCreate = props => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="username" />
			<TextInput source="email" />
			<DateInput source="birthday" />
			<TextInput source="furigana" />
			<TextInput source="phoneNumber" />
			<TextInput source="locationCity" />
			<TextInput source="locationProvince" />
			<TextInput source="extra" />
		</SimpleForm>
	</Create>
);

export const UserShow = props => (
	<Show {...props}>
		<SimpleShowLayout>
			<TextField source="username" />
			<TextField source="email" />
			<DateField source="birthday" />
			<TextField source="furigana" />
			<TextField source="phoneNumber" />
			<TextField source="locationCity" />
			<TextField source="locationProvince" />
			<TextField source="extra" />
			<TextField source="userConfirmed" />
			<TextField source="quitConfirmed" />
			<FileField source="url" title="fileID"/>
		</SimpleShowLayout>
	</Show>
);
