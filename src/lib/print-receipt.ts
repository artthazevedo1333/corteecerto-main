import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptData {
  businessName?: string;
  clientName?: string;
  serviceName?: string;
  servicePrice?: number;
  products?: ReceiptItem[];
  total: number;
  paymentMethod?: string;
  date?: Date;
}

export function printReceipt(data: ReceiptData) {
  const d = data.date || new Date();
  const products = data.products || [];
  const win = window.open("", "_blank", "width=380,height=640");
  if (!win) return;
  const rows = [
    ...(data.serviceName
      ? [
          {
            name: data.serviceName,
            quantity: 1,
            price: Number(data.servicePrice || 0),
          },
        ]
      : []),
    ...products,
  ];
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Comprovante</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Courier New', ui-monospace, monospace; max-width: 320px; margin: 0 auto; padding: 16px; color: #111; }
  h1 { font-size: 18px; text-align: center; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 2px; }
  .sub { text-align: center; font-size: 11px; color: #555; margin-bottom: 12px; }
  hr { border: none; border-top: 1px dashed #999; margin: 10px 0; }
  .row { display: flex; justify-content: space-between; font-size: 12px; margin: 3px 0; }
  .total { font-size: 16px; font-weight: 700; margin-top: 8px; }
  .foot { text-align: center; font-size: 11px; color: #555; margin-top: 16px; }
  @media print { body { padding: 0; } }
</style></head><body>
<h1>${escape(data.businessName || "Corte Certo")}</h1>
<div class="sub">Comprovante de atendimento</div>
<hr>
<div class="row"><span>Cliente</span><strong>${escape(data.clientName || "-")}</strong></div>
<div class="row"><span>Data</span><span>${format(d, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span></div>
${data.paymentMethod ? `<div class="row"><span>Pagamento</span><span>${escape(data.paymentMethod)}</span></div>` : ""}
<hr>
${rows
  .map(
    (r) => `
  <div class="row"><span>${r.quantity}x ${escape(r.name)}</span><span>R$ ${(r.price * r.quantity)
    .toFixed(2)
    .replace(".", ",")}</span></div>`,
  )
  .join("")}
<hr>
<div class="row total"><span>TOTAL</span><span>R$ ${Number(data.total).toFixed(2).replace(".", ",")}</span></div>
<div class="foot">Obrigado pela preferência!<br>${format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</div>
<script>window.onload=()=>{window.print();setTimeout(()=>window.close(),400);}</script>
</body></html>`;
  win.document.write(html);
  win.document.close();
}

function escape(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
