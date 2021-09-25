import React from 'react';

const Heading = (props) => (
	<h1 className={props.className || ''}>
		{props.children}
	</h1>
);

export default Heading;