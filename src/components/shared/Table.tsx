import danger from "../../assets/icon/danger.svg";
import { Tooltip } from "flowbite-react";

interface Column {
  name: string;
  faName: string;
}

interface Row {
  [key: string]: any;
}

const Table = ({
  columns = [],
  rows = [],
  actions = [],
  errorMessages,
  extendedClass,
  ...props
}: {
  columns: Column[];
  rows: Row[];
  actions?: any;
  extendedClass?: string;
  errorMessages?: any;
}) => {
  return (
    <div
      className={`overflow-x-auto w-full p-2 border-collapse border border-subtitle-color rounded-lg ${extendedClass ?? ""}`}
    >
      <table className="w-full table" {...props}>
        <thead className="rounded-lg">
          <tr className="border-b border-subtitle-color rounded-lg text-sm">
            {columns.map((column, index) => (
              <th key={index} className="py-4 text-center">
                {column.faName}
              </th>
            ))}
            {actions.length > 0 && <th className="py-4 text-center">عملیات</th>}
          </tr>
        </thead>
        <tbody className="font-semibold">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex !== rows.length - 1 ? "border-b border-[#E6E6F0]" : ""
              }
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`text-center py-4 ${column.name == "password" ? "w-[165px]" : ""} ${errorMessages[row.id]?.hasOwnProperty(column.name) ? "text-error-color " : ""}`}
                >
                  <div className="flex-center gap-2">
                    {errorMessages[row.id]?.hasOwnProperty(column.name) ? (
                      <>
                        <Tooltip
                          content={errorMessages[row.id][column.name]}
                          placement="bottom"
                          className="bg-tooltip-bg text-tooltip-color custom-tooltip cursor-pointer"
                        >
                          <span className={`flex gap-2 cursor-pointer `}>
                            {row[column.name] ?? "-"}

                            <img src={danger} />
                          </span>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        {column.name != "password"
                          ? (row[column.name] ?? "-")
                          : ""}
                        {column.name == "password"
                          ? row.passwordVisible
                            ? row[column.name]
                            : "********"
                          : ""}
                      </>
                    )}
                  </div>
                </td>
              ))}
              {actions.length > 0 && (
                <td className="text-center flex-center py-4 h-[60px] gap-2">
                  {actions.map((action: any, actionIndex: number) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.handler(row, rowIndex)}
                    >
                      {typeof action.label === "function"
                        ? action.label(row, rowIndex)
                        : action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
