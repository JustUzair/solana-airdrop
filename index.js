const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

// creating new wallet
const wallet = new Keypair();
// console.log(wallet);
const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;

// console.log(publicKey, secretKey);

const getWalletBalance = async function () {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(publicKey);
    console.log(`Wallet address : ${publicKey}, balance : ${walletBalance}`);
  } catch (err) {
    console.error(err);
  }
};

const airdropSOL = async function () {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromAirdropSignature = await connection.requestAirdrop(
      publicKey,
      1 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirdropSignature);
  } catch (err) {
    console.error(err);
  }
};
const main = async () => {
  await getWalletBalance();
  await airdropSOL();
  await getWalletBalance();
};

main();
