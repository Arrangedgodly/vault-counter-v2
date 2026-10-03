# Vault Counter design

## Counting workspace

The interface is a compact cash ledger. Green identifies coins, blue identifies small bills, and red identifies large bills. Names and headings preserve group meaning without relying on color.

The desktop layout pairs denomination rows with a sticky count summary. Each quantity shows the dollar value of its packaging. The summary presents total cash, group subtotals, an optional target, export, and clear with undo. On smaller screens, each row places its name and subtotal above the inputs. A sticky mobile bar keeps the running total available and links to the full summary.

## Style and behavior

Use pale green page backgrounds, white working areas, a deep green header and primary action, and restrained borders. System text uses Avenir where installed and Segoe UI on Windows. Amounts use tabular numerals. Controls have visible borders, a minimum 42 pixel input height, and amber keyboard focus outlines.

Invalid quantities show errors beside the input. Incomplete totals are withheld until the user corrects the quantities. Store settings are expandable and apply changes explicitly. Sample data is identified as demonstration content. Avoid decorative animation while users are counting cash.
