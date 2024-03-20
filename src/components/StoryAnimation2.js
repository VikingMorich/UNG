import { FlippingPages } from 'flipping-pages';
import 'flipping-pages/dist/style.css';
import { useState } from 'react';

const Story2 = () => {
    const [selected, setSelected] = useState(0);

    const back = () => {
        setSelected(selected => Math.max(selected - 1, 0));
    };

    const next = () => {
        setSelected(selected => Math.min(selected + 1, 2));
    };

    return (
        <div>
            <div className="pages">
                <FlippingPages
                    direction="right-to-left"
                    onSwipeEnd={setSelected}
                    selected={selected}
                >
                    <div className="page page1">Page 1</div>
                    <div className="page page2">Page 2</div>
                    <div className="page page3">Page 3</div>
                </FlippingPages>
            </div>
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
        </div>
    );
};

export default Story2;