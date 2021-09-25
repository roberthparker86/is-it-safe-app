import React from 'react';

import Heading from '../atoms/Heading';
import BodyCopy from '../atoms/BodyCopy';

const Header = (props) => (
	<header>
		<Heading className={"header__title"}>Is It Safe?</Heading>
		<BodyCopy className={"header__login"}>Login</BodyCopy>
	</header>
);

export default Header;