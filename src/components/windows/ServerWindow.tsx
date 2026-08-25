// src/components/windows/ServerWindow.tsx
import "xp.css/dist/XP.css";

export function ServerWindow() {
  return (
    <div
      className="window-body"
      style={{
        margin: 0,
        padding: "4px",
        height: "100%",
        boxSizing: "border-box",
        backgroundColor: "#000000",
        color: "#00ff66",
        fontFamily: "'Consolas', 'Lucida Console', 'Courier New', monospace",
        fontSize: "11px",
        lineHeight: "1.4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* Área de texto ejecutable / Salida de la consola */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
        <p style={{ margin: "0 0 8px 0", color: "#ffffff" }}>
          Microsoft Windows XP [Versión 5.1.2600]
          <br />
          (C) Copyright 1985-2001 Microsoft Corp.
        </p>

        <p style={{ margin: "0 0 12px 0" }}>
          C:\Users\Adrian&gt; <span style={{ color: "#ffffff" }}>fetch-server-info.sh --target home-lab</span>
        </p>

        <div style={{ color: "#888888", marginBottom: "8px" }}>
          [OK] Connecting to local node via SSH...
          <br />
          [OK] Fetching hardware specifications and active services...
        </div>

        {/* ASCII Banner */}
        <pre style={{ margin: "0 0 12px 0", fontFamily: "inherit", color: "#00ff66" }}>
{`  ___  ___ _ ____   _____ ___  
 / __|/ _ \\ '__\\ \\ / / _ \\ '__|
 \\__ \\  __/ |   \\ V /  __/ |   
 |___/\\___|_|    \\_/ \\___|_|   `}
        </pre>

        {/* Bloque 1: Hardware Specs */}
        <div style={{ marginBottom: "12px" }}>
          <span style={{ color: "#ffff55", fontWeight: "bold" }}>[ HARDWARE SPECIFICATIONS ]</span>
          <br />
          --------------------------------------------------
          <br />
          • <strong style={{ color: "#ffffff" }}>Model:</strong> DELL PowerEdge T320
          <br />
          • <strong style={{ color: "#ffffff" }}>CPU:</strong> Intel Xeon (12 Cores / 24 Threads)
          <br />
          • <strong style={{ color: "#ffffff" }}>RAM:</strong> 96 GB DDR3 ECC
          <br />
          • <strong style={{ color: "#ffffff" }}>Storage:</strong> 21 TB HDD (Mechanical, RAID 6 Redundancy)
          <br />
          • <strong style={{ color: "#ffffff" }}>Setup:</strong> Hand-picked hardware & fully custom-configured
        </div>

        {/* Bloque 2: Virtualization & OS */}
        <div style={{ marginBottom: "12px" }}>
          <span style={{ color: "#ffff55", fontWeight: "bold" }}>[ VIRTUALIZATION & CONTAINERS ]</span>
          <br />
          --------------------------------------------------
          <br />
          • <strong style={{ color: "#ffffff" }}>Hypervisor:</strong> Proxmox VE (PVE)
          <br />
          • <strong style={{ color: "#ffffff" }}>Storage OS:</strong> TrueNAS SCALE
          <br />
          • <strong style={{ color: "#ffffff" }}>Runtime:</strong> Docker & LXC Containers
        </div>

        {/* Bloque 3: Active Services */}
        <div style={{ marginBottom: "12px" }}>
          <span style={{ color: "#ffff55", fontWeight: "bold" }}>[ RUNNING SERVICES ]</span>
          <br />
          --------------------------------------------------
          <br />
          • <strong style={{ color: "#ffffff" }}>Home Automation:</strong> Home Assistant
          <br />
          • <strong style={{ color: "#ffffff" }}>Media Server:</strong> Plex / Jellyfin Multimedia Hub
          <br />
          • <strong style={{ color: "#ffffff" }}>File Server:</strong> Network Attached Storage (SMB/NFS)
        </div>

        {/* Prompt final activo con cursor parpadeante */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>C:\Users\Adrian&gt;&nbsp;</span>
          <span
            style={{
              display: "inline-block",
              width: "7px",
              height: "13px",
              backgroundColor: "#00ff66",
              verticalAlign: "middle",
            }}
          />
        </div>
      </div>
    </div>
  );
}