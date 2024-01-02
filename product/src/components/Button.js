function Button(props) {
    const { setdisable, disable } = props;

    const handeldisable = () => {
    
            setdisable(!disable);
        
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                onClick={handeldisable}
                disabled={!disable}
            >
                Add Product
            </button>
            {/* <button type="button" className="btn btn-success">
                Show Cart
            </button> */}
        </>
    );
}

export default Button;
