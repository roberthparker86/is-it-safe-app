

const Test = (props) => {
	return <h1>{props.children}</h1>;
};

function App() {
  return (
    <Test>
			Hippity hoppity flippity floppity.
		</Test>
  );
}

export default App;
