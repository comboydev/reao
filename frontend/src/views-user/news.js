import * as React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { SimpleList, List, Datagrid, DateInput, TextField, EditButton, ShowButton, Edit, SimpleForm, TextInput, Create, Show, SimpleShowLayout, DateField } from 'react-admin';

export const NewsList = props => {
	const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

	return (
		<List title="All news" {...props}>
			{isSmall ? (
				<SimpleList
					primaryText={record => record.newsDate}
					secondaryText={record => record.content}
				/>
			) : (
				<Datagrid>
					<DateField source="newsDate" />
					<TextField source="content" />
					<EditButton />
					<ShowButton />
				</Datagrid>
			)}
		</List>
	);
};

export const NewsEdit = props => (
	<Edit {...props}>
		<SimpleForm>
			<DateInput source="newsDate" />
			<TextInput source="content" />
		</SimpleForm>
	</Edit>
);

export const NewsCreate = props => (
	<Create {...props}>
		<SimpleForm>
			<DateInput source="newsDate" />
			<TextInput source="content" />
		</SimpleForm>
	</Create>
);

export const NewsShow = props => (
	<Show {...props}>
		<SimpleShowLayout>
			<DateField source="newsDate" />
			<TextField source="content" />
		</SimpleShowLayout>
	</Show>
);
