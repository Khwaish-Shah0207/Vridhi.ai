"use client";

import { useState, useCallback } from "react";
import { api } from "../../lib/api";
import { Upload, FileText, Download, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import RiskBadge from "../../components/RiskBadge";

const RISK_COLORS = { LOW: "#10b981", MEDIUM: "#f59e0b", HIGH: "#ef4444" };

export default function BatchPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((f) => {
    setFile(f);
    setResult(null);
    setError(null);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    const r = await api.predictBatch(file);
    setLoading(false);
    if (r.error) {
      setError(r.error);
    } else {
      setResult(r.data);
    }
  };

  const handleDownloadSample = async () => {
    const blob = await api.downloadSampleCsv();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vridhi_sample_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadResults = () => {
    if (!result || !result.results) return;
    const rows = [["business_name", "risk_score", "risk_label", "confidence", "default_probability"]];
    result.results.forEach((r) => {
      rows.push([r.business_name, r.risk_score, r.risk_label, r.confidence, r.default_probability]);
    });
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "batch_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const pieData = result
    ? [
        { name: "LOW", value: result.LOW, color: RISK_COLORS.LOW },
        { name: "MEDIUM", value: result.MEDIUM, color: RISK_COLORS.MEDIUM },
        { name: "HIGH", value: result.HIGH, color: RISK_COLORS.HIGH },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Batch Portfolio Scoring</h1>
        <p className="text-sm text-slate-500 mt-1">Upload a CSV to score multiple MSMEs at once (max 5 MB)</p>
      </div>

      {/* Upload area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        className={`bg-white rounded-xl border-2 border-dashed p-12 text-center transition-base ${
          dragOver ? "border-blue-500 bg-blue-50" : "border-slate-200"
        }`}
      >
        <Upload className="w-10 h-10 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600 font-medium mb-2">Drag and drop a CSV file here</p>
        <p className="text-sm text-slate-400 mb-4">or</p>
        <label className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-base cursor-pointer text-sm">
          Choose File
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
          />
        </label>
        {file && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="font-medium">{file.name}</span>
            <span className="text-slate-400">({(file.size / 1024).toFixed(1)} KB)</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className="bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-base flex items-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Scoring...
            </>
          ) : (
            "Score Portfolio"
          )}
        </button>
        <button
          onClick={handleDownloadSample}
          className="border border-slate-200 text-slate-600 font-medium px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-base flex items-center gap-2 text-sm"
        >
          <Download className="w-4 h-4" />
          Download Template
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-2 text-sm text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-400 uppercase">Total</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{result.total}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-400 uppercase">LOW</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{result.LOW}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-400 uppercase">MEDIUM</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{result.MEDIUM}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-400 uppercase">HIGH</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{result.HIGH}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-400 uppercase">Avg Score</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{result.average_score}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-600 mb-4">Risk Distribution</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-600 mb-4">Score Distribution</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={[
                  { name: "LOW", count: result.LOW },
                  { name: "MEDIUM", count: result.MEDIUM },
                  { name: "HIGH", count: result.HIGH },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    <Cell fill={RISK_COLORS.LOW} />
                    <Cell fill={RISK_COLORS.MEDIUM} />
                    <Cell fill={RISK_COLORS.HIGH} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700">Individual Results</h3>
              <button
                onClick={handleDownloadResults}
                className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
              >
                <Download className="w-4 h-4" /> Download CSV
              </button>
            </div>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-slate-50">
                  <tr className="text-xs text-slate-500 uppercase">
                    <th className="text-left py-2 px-4">#</th>
                    <th className="text-left py-2 px-4">Business</th>
                    <th className="text-right py-2 px-4">Score</th>
                    <th className="text-center py-2 px-4">Risk</th>
                    <th className="text-right py-2 px-4">Confidence</th>
                    <th className="text-right py-2 px-4">P(default)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.results.map((r) => (
                    <tr key={r.index} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-2 px-4 text-slate-400">{r.index + 1}</td>
                      <td className="py-2 px-4 font-medium text-slate-700">{r.business_name}</td>
                      <td className="text-right py-2 px-4 font-semibold text-slate-800">{r.risk_score}</td>
                      <td className="text-center py-2 px-4"><RiskBadge label={r.risk_label} size="sm" /></td>
                      <td className="text-right py-2 px-4 text-slate-500">{(r.confidence * 100).toFixed(1)}%</td>
                      <td className="text-right py-2 px-4 text-slate-500">{(r.default_probability * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
