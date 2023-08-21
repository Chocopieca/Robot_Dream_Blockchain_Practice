import {computed} from "vue";

export default function useBitcoinNetwork(wallets, selectedIndex) {
    const networks = {
        mainnet: {
            name: "Mainnet",
            BCNetwork: "main",
            BJSNetwork: "bitcoin",
            BScanNetwork: "btc",
        },
        testnet: {
            name: "Testnet",
            BCNetwork: "test3",
            BJSNetwork: "testnet",
            BScanNetwork: "btc-testnet",
        },
    };

    const getSelectedNetwork = computed(() => {
        return networks[wallets[selectedIndex].selectedNetwork];
    })

    function setCurrentNetwork(networkIndex) {
        const networks = ["mainnet", "testnet"];
        return  networks[networkIndex];
    }

    return {
        getSelectedNetwork, setCurrentNetwork
    }
}