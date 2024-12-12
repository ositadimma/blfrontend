import { Web3 } from 'web3';

// private RPC endpoint
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');

// or public RPC endpoint
// const web3 = new Web3('https://eth.llamarpc.com');

web3.eth.getBlockNumber().then(console.log);

export default function Home() {
    return(
        <div className="home">
            <div>
                <div className="amount-card">
                    <div>
                    <label>Balance</label>
                        <select style={{float: "right"}}>
                            <option>BTC</option>
                        </select>
                    </div>
                    <div className="balance">
                        2000.00
                    </div>
                </div>
                <div>

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