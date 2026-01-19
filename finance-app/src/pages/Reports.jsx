import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Reports() {
  const [list, setList] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const reportRef = useRef();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:5000/api/expense/list?userId=${userId}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(e => e.date && e.date.startsWith(month));
        setList(filtered);
      });
  }, [month]);

  const total = list.reduce((a, b) => a + Number(b.amount), 0);
  const byCategory = {};
  list.forEach(e => {
    byCategory[e.category] = (byCategory[e.category] || 0) + Number(e.amount);
  });

  const downloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = 190;
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, width, height);
    pdf.save(`report-${month}.pdf`);
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Reports</h2>

      <div className="input-row">
        <input type="month" value={month} onChange={e => setMonth(e.target.value)} />
        <button className="btn" onClick={downloadPDF}>Download PDF</button>
      </div>

      <div ref={reportRef}>
        <h3>Month: {month}</h3>
        <p><b>Total Spent:</b> ₹{total}</p>

        <h4>By Category</h4>
        {Object.keys(byCategory).map(c => (
          <div key={c}>{c}: ₹{byCategory[c]}</div>
        ))}

        <h4>All Expenses</h4>
        {list.map(e => (
          <div key={e._id}>
            {e.date?.slice(0,10)} - {e.title} - ₹{e.amount} ({e.category})
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;
