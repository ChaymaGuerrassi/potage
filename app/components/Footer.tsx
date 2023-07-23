import * as React from "react";

export default function Footer() {
    return (
        <footer
            className={`bg-gradient-to-r from-[#5670FB] to-[#C319A8] text-neutral-50`}
        >
            <div
                className={`px-6 lg:px-20 lg:pt-14 lg:pb-8 py-9 flex flex-col lg:flex-row justify-between gap-9 lg:gap-0`}
            >
                <img
                    src="/assets/logo/logo.svg"
                    alt="Ça potage"
                    width={200}
                    height={40}
                    className={`max-h-[40px] max-w-[200px] w-auto`}
                />
                <div className={`flex justify-between lg:w-1/3`}>
                    <div>
                        <a className={`block`} href={"blank"}>
                            Footer link
                        </a>
                    </div>
                    <div>
                        <a className={`block`} href={"blank"}>
                            Footer link
                        </a>
                    </div>
                </div>
                <div className={`lg:w-1/3`}>
                    <div className={`mb-8 lg:mb-6`}>
                        <p>
                            Anytime you learn something your time and energy are not wasted.
                            The light is your friend. There is immense joy in just watching.
                        </p>
                    </div>
                    <div className={`flex gap-[18px]`}>
                        <a href={"blank"}>
                            <img src="" alt="facebook" width={16} height={16}/>
                        </a>
                        <a href={"blank"}>
                            <img src="" alt="github" width={16} height={16}/>
                        </a>
                    </div>
                </div>
            </div>
            <div
                className={`mx-6 border-t border-neutral-50 h-10 flex justify-between items-center`}
            >
                <a href={"blank"}>
                    Legal info
                </a>
                <a href={"blank"}>
                    Legal info
                </a>
                <a href={"blank"}>
                    Legal info
                </a>
            </div>
        </footer>
    );
}
