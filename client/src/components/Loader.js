const Loader = () => {
	return (
		<div
			className='spinner-border'
			role='status'
			style={{
				width: "10rem",
				height: "10rem",
				position: "absolute",
				textAlign: "center",
				verticalAlign: "middle",
				lineHeight: "30rem",
				top: "0",
				bottom: "0",
				left: "0",
				right: "0",
				margin: "auto",
			}}
		>
			<span className='visually-hidden'>Loading...</span>
		</div>
	);
};

export default Loader;
