import { BunPlugin, plugin } from 'bun';
import { getTransformer } from '@thyseus/typescript-transformer';
import ts from 'typescript';

export default BunPlugin;

plugin(BunPlugin());

export function BunPlugin(): BunPlugin {
  return {
    name: 'Thyseus',
    async setup(build) {
      const createTransformer = getTransformer();
      const fileIds = new Set<string>();

      const printer = ts.createPrinter();
      let program: ts.Program;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let transformer: ts.TransformerFactory<any>;

      build.onLoad({ filter: /\.(ts)$/ }, (args) => {
        const id = args.path;

        if (program?.getSourceFile(id) === undefined) {
          program = ts.createProgram([id, ...fileIds], { noEmit: true }, undefined, program);
          transformer = createTransformer(program);
        }

        fileIds.add(id);

        const file = program.getSourceFile(id)!;
        const result = ts.transform(file, [transformer]);
        const javascript = printer.printFile(result.transformed[0]);

        return {
          contents: javascript,
        };
      });
    },
  };
}
