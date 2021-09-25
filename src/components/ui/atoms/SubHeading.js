import React from 'react';

const SubHeading = (props) => (
	<h2 className={props.className || ''}>
		{props.childrend}
	</h2>
);