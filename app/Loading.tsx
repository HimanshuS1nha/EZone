"use client";

import { Circles } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="flex justify-center my-4">
            <Circles
                height="80"
                width="80"
                color="#DB27C7"
                ariaLabel="circles-loading"
                visible={true}
            />
        </div>
    )
}

export default Loading