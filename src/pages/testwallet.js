import { Web3 } from 'web3';

// private RPC endpoint
// const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');
const web3 = new Web3('http://127.0.0.1:7545');

// or public RPC endpoint
// const web3 = new Web3('https://eth.llamarpc.com');

web3.eth.getBlockNumber().then(console.log);

export default function TestWallet() {
    return(
        <div className="wallet">
            <div>
                <div className="wallet-container">
                <button>create new account</button>
                <button>add account</button>
                    {/* <div>
                    <label>Balance</label>
                        <select style={{float: "right"}}>
                            <option>BTC</option>
                        </select>
                    </div>
                    <div className="balance">
                        2000.00
                    </div> */}
                </div>
                <div>
                    <h4>your accounts</h4>
                </div>
                <div>

                </div>
            </div>
            <div>
                
            </div>
            <div>
                
            </div>
        </div>
    )
} 