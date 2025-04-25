from quaisr import WireOutput, Block
from quaisr.types import STRING

def example_block(name: str, output: WireOutput):

    output.write_string("hello " + name)

if __name__ == "__main__":
    # Test the block type signature with "python main.py --generate"
    block = Block()
    block.add_input("name", STRING)
    block.add_output("output", STRING)
    block.set_entrypoint(example_block).start()

