import React from 'react';

const BodyCopy = (props) => (
	<p className={props.className || ''}>
		{props.children}
	</p>
);

export default BodyCopy;