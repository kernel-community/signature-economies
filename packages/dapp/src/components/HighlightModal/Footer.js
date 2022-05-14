// context aware
// wagmi connections

const Footer = () => {
  return (
    <div className="flex flex-row w-full justify-end gap-x-4 text-center">
    <div
      onClick={() => dispatch({type: 'close'})}
      className={buttons.basic}
    >
      Cancel
    </div>

    {!data.connected && (
      <div
        className={buttons.accent}
        onClick={connect(data.connectors[Connector.INJECTED])}>
        {error && error.message && <div>Failed to connect</div>}
        Connect
      </div>
    )}

    {data.connected && (
      <div
        className={buttons.accent}
        onClick={handleOnClickMint}
      >
      Mint
      </div>
    )}
  </div>
  )
}