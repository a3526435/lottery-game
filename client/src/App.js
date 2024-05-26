import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Lottery from './contracts/Lottery.json';

const App = () => {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const load = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Lottery.networks[networkId];
      const contract = new web3.eth.Contract(
        Lottery.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const manager = await contract.methods.manager().call();
      const players = await contract.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(contract.options.address);

      setManager(manager);
      setPlayers(players);
      setBalance(balance);
    };

    load();
  }, []);

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>There are currently {players.length} players competing to win {balance} ether!</p>
    </div>
  );
};

export default App;

