import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import RockRenderer from "./components/rockRenderer";
import _bedrock from "./assets/images/bg/_bedrock.png";
import _cardBG from "./assets/images/bg/_cardBG.png";
import _infoBox from "./assets/images/bg/_infoBox.png";
import _logo from "./assets/images/bg/cr_logo.png";

function App() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [loading, setLoading] = useState(false);
    

    console.log(data)

    

    const mintNFT = (_account, _name) => {
        setLoading(true);
        blockchain.rockzToken.methods
            .createRandomRock(_name)
            .send({ from: _account, value: blockchain.web3.utils.toWei('0.01', 'ether') })
            .once("error", (err) => {
                setLoading(false);
                console.log(err);
            })
            .then((receipt) => {
                setLoading(false);
                console.log(receipt);
                dispatch(fetchData(blockchain.account));


            })

    };


    const levelUpRock = (_account, _id) => {
        setLoading(true);

        blockchain.rockzToken.methods
            .levelUp(_id)
            .send({ from: _account, })
            .once("error", (err) => {
                setLoading(false);
                console.log(err);
            })
            .then((receipt) => {
                setLoading(false);
                console.log(receipt);
                dispatch(fetchData(blockchain.account));


            })

    };


    const throwRock = (_account, _id) => {
        setLoading(true);

        blockchain.rockzToken.methods
            .burn(_account,_id)
            .send({ from: _account })
            .once("error", (err) => {
                setLoading(false);
                console.log(err);
            })
            .then((receipt) => {
                setLoading(false);
                console.log(receipt);

    
            })

    };

    const safeTransferFrom = (_accountTo, _id) => {
        setLoading(true);

        blockchain.rockzToken.methods
            .transfer({ to: _accountTo, _id })
            .once("error", (err) => {
                setLoading(false);
                console.log(err);
            })
            .then((receipt) => {
                setLoading(false);
                console.log(receipt);
            })

    };


    useEffect(() => {
        if (blockchain.account != "" && blockchain.rockzToken != null) {
            dispatch(fetchData(blockchain.account));
        }

    }, [blockchain.rockzToken]);
    
    return (
        
        <s.Screen image={_bedrock} >
            {blockchain.account === "" || blockchain.rockzToken === null ?
                <s.Container flex={1} ai={"center"} jc={"center"}>
                    <img alt={"cr_logo"} src={_logo} />
                    
                    <s.SpacerSmall />
                    <s.styledButton style={{ backgroundColor: "gold" }} onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect(blockchain.account));
                    }}>Connect to your CryptoPetRock</s.styledButton>
                </s.Container>
                :
               
                (<s.Container ai={"center"} style={{ padding: "24px" }}>
                    <button class="tablink" onclick="openPage('Home', this, 'red')">Home</button>


                    <s.TextTitle>Welcome to CryptoPetRocks</s.TextTitle>
                    <s.SpacerSmall />
                    <s.TextSubTitle>Connected Account: {blockchain.account}</s.TextSubTitle>
                    <s.SpacerSmall />
                    <s.TextDescription for="rockName">Name your pet rock:</s.TextDescription>
                    <s.SpacerSmall />
                    < input type="text" id="rockName" name="rockName" ></input>
                    <s.SpacerSmall />
                    <s.styledButton style={{ backgroundColor: "gold",  width: "15%" }}  disabled={loading ? 1 : 0} onClick={(e) => {
                        e.preventDefault();
                        mintNFT(blockchain.account, getName()); // use an Input Box to upload their name.
                    }}
                    >
                        Mine a CryptoPetRock
                        </s.styledButton>
                    <s.SpacerMedium />
                    <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap" }}>
                        {data.allOwnerRockz.map((item, index) => {
                            return (
                             <s.Container style={{ padding: "20px" }}>
                                    <s.Container key={index} style={{ padding: "20px" }} jc={"center"} image={_cardBG} >
                                 <RockRenderer rock={item} />
                                        <s.SpacerXSmall />
                                        <s.TextDescription>ID: {item.id}</s.TextDescription>
                                        <s.SpacerSmall />
                                        <s.TextDescription>CryptoRockz</s.TextDescription>
                                        <s.SpacerXSmall />
                                        <s.Container jc={"center"} image={_infoBox}>
                                            
                                            <s.Container style={{ padding: "20px" }}>
                                                
                                      <s.TextDescription>Blockchain Information:</s.TextDescription>
                                     <s.SpacerXSmall />
                                     <s.TextDescription>NAME: {item.name}</s.TextDescription>
                                                <s.SpacerXSmall />
                                                <s.TextDescription>{item.age} Million Years Old</s.TextDescription>
                                                <s.SpacerSmall />
                                     <s.TextDescription>LEVEL: {item.level}</s.TextDescription>
                                     <s.TextDescription>RARITY: {item.rarity}</s.TextDescription>
                                                <s.SpacerXSmall />

                                                <Popup trigger={<s.styledButton style={{ backgroundColor: "gold", width: "100%" }}
                                                >
                                                    Train Rock
                                                </s.styledButton>} position="right center">
                                                    <div>

                                                        <s.styledButton style={{ backgroundColor: "gold", width: "100%" }} disabled={loading ? 1 : 0} onClick={(e) => {
                                                        e.preventDefault();
                                                        levelUpRock(blockchain.account, item.id); // use an Input Box to upload their name.
                                                    }}
                                                    >
                                                        Come
                                                    </s.styledButton>
                                                        <s.SpacerXSmall />
                                                        <s.styledButton style={{ backgroundColor: "gold", width: "100%" }} disabled={loading ? 1 : 0} onClick={(e) => {
                                                            e.preventDefault();
                                                            levelUpRock(blockchain.account, item.id); // use an Input Box to upload their name.
                                                        }}
                                                        >
                                                            Sit
                                                        </s.styledButton>
                                                        <s.SpacerXSmall />
                                                        <s.styledButton style={{ backgroundColor: "gold", width: "100%" }} disabled={loading ? 1 : 0} onClick={(e) => {
                                                            e.preventDefault();
                                                            levelUpRock(blockchain.account, item.id); // use an Input Box to upload their name.
                                                        }}
                                                        >
                                                            Stay
                                                        </s.styledButton>

                                                        <s.SpacerXSmall />
                                                        <s.styledButton style={{ backgroundColor: "gold", width: "100%" }} disabled={loading ? 1 : 0} onClick={(e) => {
                                                            e.preventDefault();
                                                            levelUpRock(blockchain.account, item.id); // use an Input Box to upload their name.
                                                        }}
                                                        >
                                                            Down
                                                        </s.styledButton>
                                                        <s.SpacerXSmall />
                                                        <s.styledButton style={{ backgroundColor: "gold", width: "100%" }} disabled={loading ? 1 : 0} onClick={(e) => {
                                                            e.preventDefault();
                                                            levelUpRock(blockchain.account, item.id); // use an Input Box to upload their name.
                                                        }}
                                                        >
                                                            Stand
                                                        </s.styledButton>

                                                        <s.SpacerXSmall />
                                                        <s.styledButton style={{ backgroundColor: "gold", width: "100%" }} disabled={loading ? 1 : 0} onClick={(e) => {
                                                            e.preventDefault();
                                                            levelUpRock(blockchain.account, item.id); // use an Input Box to upload their name.
                                                        }}
                                                        >
                                                            Heel
                                                        </s.styledButton>









                                                    </div>
                                                </Popup>
                                                

                                    
                                                <s.SpacerXSmall />



                                                <Popup trigger={<s.styledButton style={{ backgroundColor: "gold", width: "100%" }}>
                                                    Throw Rock
                                                </s.styledButton>} position="right center">
                                                    <div>
                                                        <s.styledButton style={{ backgroundColor: "gold", width: "100%" }} disabled={loading ? 1 : 0} onClick={(e) => {
                                                            e.preventDefault();
                                                            throwRock(blockchain.account, item.id); // use an Input Box to upload their name.
                                                        }}
                                                        >
                                                            Throw Rock Away
                                                        </s.styledButton>
                                                        <s.SpacerXSmall />

                                                        <s.TextDescription style={{ color: "Green" }} for="friendAddress" >Enter your friends address:</s.TextDescription>
                                                        <s.SpacerSmall />
                                                        < input type="text" id="friendAddress" name="friendAddress" ></input>
                                                        <s.SpacerSmall />

                                                        <s.styledButton style={{ backgroundColor: "gold", width: "100%" }} style={{ backgroundColor: "gold", width: "100%" }} disabled={loading ? 1 : 0} onClick={(e) => {
                                                            e.preventDefault();
                                                            safeTransferFrom(blockchain.account, getFriendAddress(), item.id); // use an Input Box to upload their name.
                                                        }} >
                                                            Friend Cast
                                                        </s.styledButton> 
                                                            <s.SpacerXSmall />

                                                            
                                                    </div>
                                                </Popup>

                                            
                                            
                                                

                                            </s.Container>

                                        </s.Container>
                                        <s.SpacerXSmall />
                                        <s.TextDescription>DNA: {item.dna}</s.TextDescription>
                                    </s.Container>
                             </s.Container>
                         );
                     })}
                </s.Container>

                </s.Container>
            )}
            </s.Screen>
    );
}



function getName() {
    var rockName_User = document.getElementById("rockName").value;

    return rockName_User
};

function getFriendAddress() {
    var friendAddress = document.getElementById("friendAddress").value;

    return friendAddress
};

export default App;