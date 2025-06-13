import {Fragment} from "react";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import apiClient from "../../http-commons";
import Footer from "./Footer";

interface MainData {
    list: [
        {
            name: string;
            address: string;
            hit: number;
            phone: string;
            bar_no: number;
            image: string;
            loc: string;
        }
    ]
}

function Home() {
    const {isLoading, isError, error, data} = useQuery<{ data: MainData }, Error>({
        queryKey: ["main-data"],
        queryFn: async () => await apiClient.get("/main")
    })
    if (isLoading) return <h1 className={"text-center"}>Loading...</h1>;
    if (isError) return <h1 className={"text-center"}>Error...{error?.message}</h1>;
    console.log(data?.data); // undefined가 아니라면 data.data && => data가 null이 아니라면
    return (
        <Fragment>
            <div style={{marginTop:"10px"}}></div>
            <h3 className={"text-center"}>popularity BAR</h3>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row mb-4">
                            {
                                data?.data.list.map((bars, index) =>
                                    <div className="col-lg-3" style={{marginTop:"15px"}}>
                                        <div className="card h-100">
                                            <Link to="#">
                                                <img style={{width:"240px", height:"240px"}} src={bars.image} />
                                            <div className="card-body">
                                                <div className="small text-muted">지역 ( {bars.loc} )</div>
                                                <h2 className="card-title h4"
                                                    style={{overflow: "hidden",
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis"
                                                }}>{bars.name}</h2>
                                                <p className="card-text"
                                                >{bars.address}</p>
                                            </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home;