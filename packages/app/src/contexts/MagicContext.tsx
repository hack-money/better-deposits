import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
  useEffect,
} from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Magic, MagicUserMetadata } from "magic-sdk";

interface Props {
  children: ReactElement | ReactElement[];
}

interface State {
  magic?: Magic;
}

export const MagicContext = createContext({} as State);

export function useMagicContext(): State {
  return useContext(MagicContext);
}

function MagicProvider({ children }: Props) {
  // WARNING: This requires a domain whitelist to be set up on https://dashboard.magic.link/
  // Otherwise users are vulnerable to a phishing attack on other websites
  const MAGIC_API_KEY = "pk_test_A0179DDB0B358224";

  const customNodeOptions = {
    rpcUrl: "http://127.0.0.1:8545",
    chainId: 31337, // networkId of buidlerEVM test network
  };

  const magic = new Magic(MAGIC_API_KEY, {
    network: customNodeOptions,
  });

  return (
    <MagicContext.Provider value={{ magic }}>{children}</MagicContext.Provider>
  );
}

export const useMagic = (): Magic | undefined => {
  const { magic } = useMagicContext();
  return magic;
};

export const useProvider = (): Web3Provider | null => {
  const { magic } = useMagicContext();
  return typeof magic?.rpcProvider !== "undefined"
    ? // @ts-ignore
      new Web3Provider(magic.rpcProvider)
    : null;
};

export const useUserMetadata = (): MagicUserMetadata => {
  const { magic } = useMagicContext();
  const [metadata, setMetadata] = useState<MagicUserMetadata>({
    issuer: null,
    publicAddress: null,
    email: null,
  });

  useEffect(() => {
    const updateMetadata = async () => {
      if (magic && magic.user) {
        const newMetadata = await magic.user.getMetadata();
        setMetadata(newMetadata);
      }
    };
    updateMetadata();
  }, [magic]);

  return metadata;
};

export const useLoginWithMagicLink = (): ((
  email: string,
) => Promise<string | null>) => {
  const { magic } = useMagicContext();
  return async (email: string) =>
    typeof magic?.auth !== "undefined"
      ? magic?.auth.loginWithMagicLink({ email })
      : null;
};

export default MagicProvider;
