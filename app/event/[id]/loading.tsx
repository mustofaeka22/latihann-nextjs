export default function LoadingEventDetail() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8fafc",
      padding: "40px 20px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Simulasi Tombol Kembali */}
        <div className="animate-pulse" style={{ width: "150px", height: "16px", background: "#e2e8f0", borderRadius: "4px" }} />

        {/* Simulasi Kotak Utama Detail Event */}
        <div className="animate-pulse" style={{
          background: "#ffffff",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {/* Kotak kecil untuk kategori event */}
          <div style={{ width: "90px", height: "24px", background: "#cbd5e1", borderRadius: "8px" }} />
          
          {/* Kotak lebar untuk judul event */}
          <div style={{ width: "60%", height: "32px", background: "#cbd5e1", borderRadius: "8px" }} />

          {/* Baris untuk tanggal / waktu event */}
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ width: "80%", height: "16px", background: "#e2e8f0", borderRadius: "4px" }} />
            <div style={{ width: "50%", height: "16px", background: "#e2e8f0", borderRadius: "4px" }} />
          </div>
        </div>

        {/* Simulasi Kotak Tinggi untuk Formulir Pendaftaran Event */}
        <div className="animate-pulse" style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          <div style={{ width: "40%", height: "20px", background: "#cbd5e1", borderRadius: "4px" }} />
          <div style={{ width: "100%", height: "40px", background: "#e2e8f0", borderRadius: "8px" }} />
          <div style={{ width: "100%", height: "40px", background: "#e2e8f0", borderRadius: "8px" }} />
        </div>

      </div>
    </main>
  );
}