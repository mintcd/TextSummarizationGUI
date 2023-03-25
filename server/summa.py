from summa.summarizer import summarize

class Summa:
    def __init__(self, input : str):
        self.input = input

    def summarize(self):
        return summary = summarize(input, ratio=0.5)